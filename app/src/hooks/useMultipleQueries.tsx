import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

import { getGraphUris } from '../util/networks'

type GraphVariables = { [key: string]: string }
const fetchQuery = (query: string, variables: GraphVariables, endpoint: string) => {
  return axios.post(endpoint, { query, variables })
}

export const useMultipleQueries = <T,>(queries: Maybe<string[]>, variables: GraphVariables): Maybe<T[]> => {
  const { chainId } = useWeb3React()
  if (chainId == null) throw new Error('Missing chain ID')
  const [queriesResult, setQueriesResult] = useState<Maybe<T[]>>(null)

  const { httpUri } = getGraphUris(chainId)
  const fetchQueries = useCallback(async () => {
    if (queries) {
      const response = await Promise.all(queries.map(q => fetchQuery(q, variables, httpUri)))
      setQueriesResult(response.filter(d => d && d.data).map(d => d.data))
    }
  }, [httpUri, queries, variables])
  useEffect(() => {
    fetchQueries()
  }, [fetchQueries])

  return queriesResult
}
