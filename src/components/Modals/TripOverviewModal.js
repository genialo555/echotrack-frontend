// src/components/Modals/TripOverviewModal.js

import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const TripOverviewModal = ({ isOpen, onClose, trips }) => {
  // Fonction pour formater la date en français
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy, HH:mm', { locale: fr });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>
        Vue d'Ensemble des Trajets
        <IconButton
          aria-label="Fermer"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <X />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6" gutterBottom>
          Consultez la liste de tous vos trajets enregistrés, avec leurs détails et leur impact environnemental.
        </Typography>

        {trips.length === 0 ? (
          <Typography variant="body1" align="center" color="textSecondary" sx={{ mt: 4 }}>
            Aucun trajet enregistré pour le moment.
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {['Départ', 'Arrivée', 'Distance', 'Durée', 'Mode de Transport', 'Émissions', 'Date'].map((header) => (
                    <TableCell key={header} align="left" sx={{ fontWeight: 'bold' }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {trips.map((trip) => (
                  <TableRow key={trip.id} hover>
                    <TableCell>{trip.origin}</TableCell>
                    <TableCell>{trip.destination}</TableCell>
                    <TableCell>{trip.distance} km</TableCell>
                    <TableCell>{trip.duration}</TableCell>
                    <TableCell>{trip.travelMode}</TableCell>
                    <TableCell>{trip.emissions}</TableCell>
                    <TableCell>{formatDate(trip.date)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
