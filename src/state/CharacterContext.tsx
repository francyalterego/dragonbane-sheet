import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { Character, createEmptyCharacter } from '../types/character';

const STORAGE_KEY = 'dragonbane-character-v1';

interface Ctx {
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
  update: <K extends keyof Character>(key: K, value: Character[K]) => void;
  resetCharacter: () => void;
}

const CharacterCtx = createContext<Ctx | null>(null);

function loadInitial(): Character {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...createEmptyCharacter(), ...JSON.parse(raw) };
  } catch {
    // localStorage non disponibile o dati corrotti: si riparte da una scheda vuota
  }
  return createEmptyCharacter();
}

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [character, setCharacter] = useState<Character>(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
    } catch {
      // storage pieno o non disponibile: la sessione continua comunque in memoria
    }
  }, [character]);

  const update: Ctx['update'] = (key, value) => {
    setCharacter((prev) => ({ ...prev, [key]: value }));
  };

  const resetCharacter = () => setCharacter(createEmptyCharacter());

  return (
    <CharacterCtx.Provider value={{ character, setCharacter, update, resetCharacter }}>
      {children}
    </CharacterCtx.Provider>
  );
}

export function useCharacter() {
  const ctx = useContext(CharacterCtx);
  if (!ctx) throw new Error('useCharacter deve essere usato dentro CharacterProvider');
  return ctx;
}
