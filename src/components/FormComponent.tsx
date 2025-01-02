// src/components/FormComponent.tsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box } from '@mui/material';
import { fetchInitialData } from '../api/api';

// Define the validation schema
const schema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old').max(100, 'Must be less than 100 years old'),
});

type FormData = z.infer<typeof schema>;

const FormComponent: React.FC = () => {
  const [initialData, setInitialData] = useState<FormData | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || { name: '', email: '', age: 0, },
  });

  useEffect(() => {
    const loadInitialData = async () => {
      const data = await fetchInitialData();
      setInitialData(data);
      reset(data);
    };
    loadInitialData();
  }, [reset]);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = ''; // Prompt user with default browser message
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
      />
      <TextField
        label="Email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ''}
      />
      <TextField
        label="Age"
        type="number"
        {...register('age', { valueAsNumber: true })}
        error={!!errors.age}
        helperText={errors.age ? errors.age.message : ''}
      />
      <Button type="submit" variant="contained">Submit</Button>
    </Box>
  );
};

export default FormComponent;
