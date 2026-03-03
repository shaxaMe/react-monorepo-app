import type { CreateUserPayload, UserRole } from '@repo/types';
import { Button, Input } from '@repo/ui';
import { useState } from 'react';


import { useUsersStore } from '../store/users-store';

import styles from './CreateUserForm.module.css';

interface CreateUserFormProps {
  readonly onSuccess: () => void;
}

interface FormState {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

const INITIAL_STATE: FormState = {
  email: '',
  firstName: '',
  lastName: '',
  role: 'viewer',
};

export const CreateUserForm = ({ onSuccess }: CreateUserFormProps) => {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createUser = useUsersStore((s) => s.createUser);

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormState((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: CreateUserPayload = {
      email: formState.email.trim(),
      firstName: formState.firstName.trim(),
      lastName: formState.lastName.trim(),
      role: formState.role,
    };

    createUser(payload)
      .then(() => {
        onSuccess();
      })
      .catch(() => {
        // Error is already in the store
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.fields}>
        <div className={styles.row}>
          <Input
            label="First name"
            value={formState.firstName}
            onChange={handleChange('firstName')}
            required
            placeholder="Jane"
          />
          <Input
            label="Last name"
            value={formState.lastName}
            onChange={handleChange('lastName')}
            required
            placeholder="Smith"
          />
        </div>
        <Input
          type="email"
          label="Email address"
          value={formState.email}
          onChange={handleChange('email')}
          required
          placeholder="jane@example.com"
        />
        <div>
          <label htmlFor="role-select" className={styles.label}>
            Role
          </label>
          <select
            id="role-select"
            className={styles.select}
            value={formState.role}
            onChange={handleChange('role')}
          >
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
      <div className={styles.footer}>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          Create User
        </Button>
      </div>
    </form>
  );
};
