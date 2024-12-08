import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/authSlice';
import { FaGoogle, FaApple, FaMicrosoft } from 'react-icons/fa';
import Chatbot from '../components/Chatbot';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative; // Ajouté pour le positionnement relatif

  @media (max-width: 768px) {
    margin: 20px auto;
    padding: 20px;
    max-width: 90%;
  }
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  color: #16a34a;
  margin-bottom: 40px;
  font-size: 2rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 30px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #374151;
  font-weight: 500;
  font-size: 1rem;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 14px;
  margin-bottom: 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1.125rem;
  
  &:focus {
    outline: none;
    border-color: #16a34a;
    box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.2);
  }

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 1rem;
  }
`;

const ErrorText = styled.div`
  color: #ef4444;
  margin-bottom: 16px;
  font-size: 0.875rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #16a34a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #15803d;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 14px;
    font-size: 1rem;
  }
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  color: ${props => props.variant === 'apple' ? '#000000' : '#ffffff'};
  background-color: ${props => {
    switch (props.variant) {
      case 'google':
        return '#EA4335';
      case 'microsoft':
        return '#00A4EF';
      case 'apple':
        return '#f5f5f7';
      default:
        return '#ffffff';
    }
  }};
  border: ${props => props.variant === 'apple' ? 'none' : '1px solid transparent'};
  box-shadow: ${props => props.variant === 'apple' ? '0 1px 2px rgba(0, 0, 0, 0.1)' : 'none'};

  &:hover {
    background-color: ${props => {
    switch (props.variant) {
      case 'google':
        return '#D93025';
      case 'microsoft':
        return '#0078D4';
      case 'apple':
        return '#e8e8eb';
      default:
        return '#f3f4f6';
    }
  }};
  }

  svg {
    margin-right: 12px;
    font-size: 1.25rem;
  }

  @media (max-width: 768px) {
    padding: 14px;
    font-size: 1rem;
    svg {
      font-size: 1.125rem;
    }
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
  
  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #d1d5db;
  }

  span {
    margin: 0 16px;
    color: #6b7280;
    font-size: 1rem;
  }
`;

const ForgotPassword = styled(Link)`
  display: block;
  text-align: right;
  color: #16a34a;
  font-size: 1rem;
  text-decoration: none;
  margin: -8px 0 20px 0;

  &:hover {
    text-decoration: underline;
  }
`;

const Text = styled.p`
  text-align: center;
  color: #374151;
  margin-top: 20px;
  font-size: 1rem;

  a {
    color: #16a34a;
    font-weight: 600;
    text-decoration: none;
    margin-left: 4px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {  // Un utilisateur est connecté
      const userRole = user.token ? JSON.parse(atob(user.token.split('.')[1])).role : null;
      if (userRole === 'USER') {
        navigate('/dashboard-utilisateur');
      } else if (userRole === 'ADMIN') {
        navigate('/dashboard-entreprise');
      }
    }
  }, [user, navigate]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Adresse email invalide.')
      .required('L\'adresse email est requise.'),
    password: Yup.string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
      .required('Le mot de passe est requis.'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      toast.success('Connexion réussie !');
      resetForm();
    } catch (err) {
      toast.error(err.message || 'Erreur lors de la connexion. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Container>
        <FormContainer>
          <Title>Connexion</Title>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" placeholder="jeremienunez@gmail.com" />
                <ErrorMessage name="email" component={ErrorText} />

                <Label htmlFor="password">Mot de passe</Label>
                <Input type="password" id="password" name="password" placeholder="Mot de passe" />
                <ErrorMessage name="password" component={ErrorText} />

                <ForgotPassword to="/mot-de-passe-oublie">
                  Mot de passe oublié ?
                </ForgotPassword>

                <Button type="submit" disabled={isSubmitting || loading}>
                  {isSubmitting || loading ? 'Connexion en cours...' : 'Continuer'}
                </Button>
              </Form>
            )}
          </Formik>

          <Text>
            Vous n'avez pas de compte ?<Link to="/inscription">Inscription</Link>
          </Text>

          <Divider>
            <span>ou</span>
          </Divider>

          <SocialButton 
            variant="google" 
            onClick={() => toast.info('Connexion avec Google en cours...')}
          >
            <FaGoogle />
            Continuer avec Google
          </SocialButton>

          <SocialButton 
            variant="microsoft" 
            onClick={() => toast.info('Connexion avec Microsoft en cours...')}
          >
            <FaMicrosoft />
            Continuer avec Microsoft Account
          </SocialButton>

          <SocialButton 
            variant="apple" 
            onClick={() => toast.info('Connexion avec Apple en cours...')}
          >
            <FaApple />
            Continuer avec Apple
          </SocialButton>

          {error && <ErrorText>{error}</ErrorText>}
        </FormContainer>
      </Container>
      <Chatbot />
    </>
  );
};

export default Login;