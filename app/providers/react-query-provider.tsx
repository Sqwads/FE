"use client"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'


const queryClient = new QueryClient({
    defaultOptions: {
  
      queries: {
        refetchOnWindowFocus:false,
        
        retry: () => false,
      },
    },
});


function CustomQueryClientProvider({children}: Readonly<{
  children: React.ReactNode;
}>) {
    return(
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
}

export default CustomQueryClientProvider
