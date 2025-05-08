import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const AVATAR_URL = "https://api.dicebear.com/7.x/adventurer/svg?seed=User";

const EditProfile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-64px-56px)] bg-white font-sans flex flex-col">
      {/* Fondo decorativo */}
      <div className="relative h-72 w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-yellow-200 to-blue-200" />
        <div className="absolute left-1/2 top-56 transform -translate-x-1/2">
          <img
            src={AVATAR_URL}
            alt="Avatar"
            className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto px-4 sm:px-8 pt-32"
      >
        {/* Nombre */}
        <div className="w-full text-center">
          <label className="block text-lg font-semibold text-gray-900 mb-1">Nombre</label>
          <Input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="text-center text-xl font-bold"
            required
          />
        </div>
        {/* Email */}
        <div className="w-full text-center">
          <label className="block text-lg font-semibold text-gray-900 mb-1">Email</label>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="text-center"
            required
          />
        </div>
        <Button type="submit" variant="primary" className="w-full mt-4 text-lg">Guardar Cambios</Button>
        {success && <div className="text-green-600 text-center font-semibold">¡Perfil actualizado!</div>}
      </form>
    </div>
  );
};

export default EditProfile;
