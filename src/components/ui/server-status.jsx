import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'
import { checkHealth } from '../../api/tasks.js'

const ServerStatus = () => {
  const [status, setStatus] = useState('idle')

  const verifyConnection = useCallback(async () => {
    let resolved = false
    const timer = setTimeout(() => {
      if (!resolved) {
        setStatus('waking')
      }
    }, 2000)

    try {
      await checkHealth()
      resolved = true
      clearTimeout(timer)
      setStatus((prev) => {
        if (prev === 'waking') {
          setTimeout(() => setStatus('idle'), 3000)
          return 'connected'
        }
        return 'idle'
      })
    } catch {
      resolved = true
      clearTimeout(timer)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    verifyConnection()
  }, [verifyConnection])

  if (status === 'idle') return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed top-3 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[92%]"
      >
        {status === 'waking' && (
          <div className="bg-amber-500 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              <span>Waking up server (takes ~30s on free tier)...</span>
            </div>
          </div>
        )}

        {status === 'connected' && (
          <div className="bg-emerald-600 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Backend server connected!</span>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-500 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Server unreachable</span>
            </div>
            <button
              type="button"
              onClick={verifyConnection}
              className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition text-[11px]"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default ServerStatus
