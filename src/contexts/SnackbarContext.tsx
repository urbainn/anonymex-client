/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode, type SyntheticEvent } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import type { SnackbarCloseReason } from '@mui/material/Snackbar'

interface SnackbarEtat {
  ouverte: boolean
  message: string
  duree: number
}

interface SnackbarContexte {
  afficherErreur: (message: string, duree?: number) => void
  fermerSnackbar: () => void
}

const SnackbarContext = createContext<SnackbarContexte | undefined>(undefined)

/**
 * Afficher des snackbars (petites notifications en bas d'écran)
 */
export function SnackbarProvider ({ children }: { children: ReactNode }) {
  const [etatSnackbar, setEtatSnackbar] = useState<SnackbarEtat>({
    ouverte: false,
    message: '',
    duree: 6000
  })

  const fermerSnackbar = useCallback(() => {
    setEtatSnackbar((etat) => ({ ...etat, ouverte: false }))
  }, [])

  const gererFermeture = useCallback((_: Event | SyntheticEvent, raison?: SnackbarCloseReason) => {
    if (raison === 'clickaway') return
    fermerSnackbar()
  }, [fermerSnackbar])

  const afficherErreur = useCallback((message: string, duree = 6000) => {
    setEtatSnackbar({
      ouverte: true,
      message,
      duree
    })
  }, [])

  const valeur = useMemo(() => ({ afficherErreur, fermerSnackbar }), [afficherErreur, fermerSnackbar])

  return (
    <SnackbarContext.Provider value={valeur}>
      {children}

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={etatSnackbar.ouverte}
        autoHideDuration={etatSnackbar.duree}
        onClose={gererFermeture}
      >
        <Alert severity='error' variant='filled'>
          {etatSnackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

export function useSnackbarGlobal () {
  const contexte = useContext(SnackbarContext);

  if (!contexte) {
    throw new Error('useSnackbarGlobal doit être utilisé dans un SnackbarProvider');
  }

  return contexte;
}
