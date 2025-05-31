'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
  
export default function Home() {
  const [qtd, setQtd] = useState(10);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const handleDownload = () => {
    if (qtd < 1 || qtd > 100000) {
      alert('Digite uma quantidade entre 1 e 100000.');
      return;
    }
    window.location.href = `/api/exportar-gtin?qtd=${qtd}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black p-6 text-gray-900 dark:text-white flex flex-col items-center justify-center">
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        GTIN Express
      </motion.h1>

      <motion.div
        className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <label className="block mb-2 text-sm font-medium">
          Quantos GTIN-13 deseja gerar?
        </label>
        <input
          type="number"
          value={qtd}
          min={1}
          max={100000}
          onChange={(e) => setQtd(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          onClick={handleDownload}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Baixar GTINs
        </button>
      </motion.div>
    </main>
  );
}
