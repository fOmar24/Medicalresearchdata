"use client";
import React, { useState } from 'react';
import MedicalForm from '../../components/MedicalForm';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
          <MedicalForm packageId="0x9a37905ef941cd7f0270f0b363c7d202dd5d105102a590051895589f3959431c" moduleName="medicalresearchdata" />
        </main>
      );
    }
  