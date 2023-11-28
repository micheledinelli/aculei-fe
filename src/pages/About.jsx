import { useRef } from "react";
import AboutImg from "../assets/about.jpeg";
import { NavLink } from "react-router-dom";

export default function About() {
  const title = "ABOUT";
  const home = "HOME";

  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-screen w-full">
      <img className="object-cover w-full h-full" src={AboutImg}></img>
      <div className="absolute top-0 left-0 w-full">
        <div className="w-full text-9xl text-white p-10">{title}</div>
      </div>

      <div className="absolute w-full bottom-2 inset-x-0 text-white text-2xl flex items-center justify-center">
        <a className="animate-bounce" onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </a>
      </div>
      <div className="mx-80 my-10" ref={ref}>
        <h2 className="text-5xl my-10">Abstract</h2>
        <p className="leading-loose text-lg">
          Come il resto del mondo, nel marzo 2020 sono stato preso alla
          sprovvista della pandemia di Covid-19 e del conseguente lockdown. Per
          mia grande fortuna nel momento della chiusura totale avevo già
          lasciato Milano per altre ragioni e mi trovavo nell'azienda agricola
          dei miei genitori a Perugia. Essendo all'epoca studente del Master di
          Fotografia e linguaggio visivo di Naba avevo necessità di realizzare
          una serie di immagini che mi sarebbero servite per gli esami
          accademici. Avendo tutta l'attrezzatura fotografica a Milano (dovevo
          stare via meno di una settimana) ho deciso di realizzare parte delle
          fotografie attraverso una fototrappola che mio padre aveva acquistato
          per monitorare il recinto delle capre dato che poco tempo prima una di
          loro era sparita senza traccie di lupi o altri possibili predatori.
          Inizialmente avevo deciso di delegare a Platoon, il cavallo, il
          compito di monitorare la proprietà durante la notte così ogni sera gli
          mettevo la cavezza su cui avevo montato la suddetta fototrappola.
          Frutto di questo lavoro fu l'editoriale dedicato a Birretta, la
          capretta scomparsa, interamente fotografato da Platoon durante le 54
          notti di lockdown pubblicato in Nothing To See Here il magazine di
          Naba curato da Francesco Jodice. Una volta tornati alla “normalità”
          della situazione sanitaria ho deciso di proseguire l'indagine sul
          territorio mediante questi strumenti parzialmente autonomi al fine di
          soddisfare la mia curiosità rispetto a quello che accadeva intorno a
          me durante la notte. Da questa fase del lavoro nasce HC-800A un
          cofanetto di 5 libri, flipbook, realizzati per l'Open Call ITALIA90
          organizzata da Condominio Arte ed esposto durante la mostra 2dedicata.
          ACULEI sarebbe dunque un terzo capitolo di questo archivio che al
          momento conta oltre 15.000 immagini realizzate negli anni mediante
          l'utilizzo di 7 diverse fototrapolle. Ad oggi sono 5 quelle
          correttamente funzionanti mentre 2 sono andate distrutte per cause
          naturali. Vorrei costituire un vero e proprio archivio fotografico
          interattivo in cui l'utente è guidato dall'Intelligenza Artificiale
          nell'esplorazione dell'insieme di immagini.Si tratta quindi di
          utilizzare un database online (Dropbox) suddiviso in cartelle secondo
          una serie di criteri stabiliti a monte (ad es: numero della camera,
          fase lunare, temperatura, animale fotografato, effetti ottici, spot in
          cui è la camera, ecc..) a cui L'AI attinge per definire il layout e il
          contenuto della galleria di immagini sulla base dell'interazione
          dell'utente con la piattaforma web. Essendo un archivio è importante
          tenere a mente che il database sarà costantemente aggiornato mano a
          mano che verranno scaricate le schede delle camere e dunque questo
          sarà sempre più numeroso. Dinamicità e la vastità dell'archivio
          saranno infatti in continua crescita.Da un punto di vista concettuale,
          il progetto risulta a mio avviso coerente con l'automazione
          tecnologica partecipe alla creazione di queste immagini: l'animale che
          passa davanti al sensore, azionandolo, diventa parte attiva del
          meccanismo di scatto oltreché soggetto dell'immagine delegando di
          fatto alla tecnologia la sua posizione all'interno dell'inquadratura.
          C'è quindi una sorta di interazione tra animale e tecnologia alla base
          di tutte le immagini qui proposte, la stessa che si vorrebbe provare a
          riproporre come esperienza virtuale su aculei.xyz.
        </p>
      </div>
      <div className="flex justify-center items-center text-3xl mt-10 p-10 bg-black text-white hover:underline hover:underline-offset-8 decoration-4">
        <NavLink to={"/"}>{home}</NavLink>
      </div>
    </div>
  );
}
