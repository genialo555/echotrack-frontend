import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../slices/authSlice';
import { FaGoogle, FaMicrosoft } from 'react-icons/fa';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

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
  background-color: ${props => props.variant === 'google' ? '#EA4335' : '#00A4EF'};
  color: #ffffff;

  &:hover {
    background-color: ${props => props.variant === 'google' ? '#D93025' : '#0078D4'};
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

const Inscription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/dashboard-utilisateur');
    }
  }, [user, navigate]);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères.')
      .max(20, 'Le nom d\'utilisateur ne peut pas dépasser 20 caractères.')
      .required('Le nom d\'utilisateur est requis.'),
    email: Yup.string()
      .email('Adresse email invalide.')
      .max(50, 'L\'adresse email ne peut pas dépasser 50 caractères.')
      .required('L\'adresse email est requise.'),
    password: Yup.string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
      .max(32, 'Le mot de passe ne peut pas dépasser 32 caractères.')
      .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}/, 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.')
      .required('Le mot de passe est requis.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre.')
      .required('La confirmation du mot de passe est requise.')
  });

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const { confirmPassword, ...registerData } = values;
    registerData.role = 'USER'; // Set default role
    registerData.provider = 'LOCAL'; // Set default provider

    try {
      await dispatch(registerUser(registerData)).unwrap();
      toast.success('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      resetForm();
    } catch (err) {
      toast.error(err.message || 'Erreur lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Créer un compte</Title>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input 
                type="text" 
                id="username" 
                name="username" 
                placeholder="Votre nom d'utilisateur" 
              />
              <ErrorMessage name="username" component={ErrorText} />

              <Label htmlFor="email">Email</Label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="votre@gmail.com" 
              />
              <ErrorMessage name="email" component={ErrorText} />

              <Label htmlFor="password">Mot de passe</Label>
              <Input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Mot de passe" 
              />
              <ErrorMessage name="password" component={ErrorText} />

              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                placeholder="Confirmer le mot de passe" 
              />
              <ErrorMessage name="confirmPassword" component={ErrorText} />

              <Button type="submit" disabled={isSubmitting || loading}>
                {isSubmitting || loading ? 'Inscription en cours...' : 'Créer un compte'}
              </Button>
            </Form>
          )}
        </Formik>

        <Text>
          Déjà inscrit ?<Link to="/">Se connecter</Link>
        </Text>

        <Divider>
          <span>ou</span>
        </Divider>

        <SocialButton 
          variant="google" 
          onClick={() => toast.info('Inscription avec Google en cours...')}
        >
          <FaGoogle />
          Continuer avec Google
        </SocialButton>

        <SocialButton 
          variant="microsoft" 
          onClick={() => toast.info('Inscription avec Microsoft en cours...')}
        >
          <FaMicrosoft />
          Continuer avec Microsoft Account
        </SocialButton>

        {error && <ErrorText>{error}</ErrorText>}
      </FormContainer>
    </Container>
  );
};

export default Inscription;