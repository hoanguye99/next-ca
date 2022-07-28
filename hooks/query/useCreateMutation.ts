import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useState } from "react"

export function useCreateMutation<TREQ, TRES>(cb: (param: TREQ) => Promise<TRES>) {

  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const mutation = useMutation<TRES, AxiosError, TREQ, TRES>(cb, {
    onError: (error, variables, context) => {
      setShowErrorModal(true)
    },
    onSuccess: (data, variables, context) => {
      setShowDetailModal(true)
    },
  })

  function closeDetailModal() {
    mutation.reset()
    setShowDetailModal(false)
  }
  
  function closeErrorModal() {
    mutation.reset()
    setShowErrorModal(false)
  }

  return {
    showDetailModal,
    closeDetailModal,
    data: mutation.data,
    posting: mutation.isLoading,
    showErrorModal,
    closeErrorModal,
    error: mutation.error,
    mutation
  }
}
