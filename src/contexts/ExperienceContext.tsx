import { ReactNode, createContext, useContext, useState } from "react";

interface ExperienceContextProps {
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
}

const ExperienceContext = createContext<ExperienceContextProps | undefined>(
  undefined
);

export const ExperienceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [images, setImages] = useState<Image[]>([]);

  return (
    <ExperienceContext.Provider value={{ images, setImages }}>
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error("useExperience must be used within a ExperienceProvider");
  }
  return context;
};
