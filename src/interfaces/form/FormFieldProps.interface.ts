import React from 'react';

export interface FormFieldProps {
  label: string;
  name: string;
  lastName: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
