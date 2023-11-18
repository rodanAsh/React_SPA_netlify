import axios from 'axios'
import {useEffect, useState} from 'react'

const useAxiousFetch = (dataUrl) => {
    const [data, setData] = useState([])
    const [fetcherror, setFetchError] = useState(null)
    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {
        let isMounted = true;
        const source=axios.CancelToken.source();

        const fetchdata = async (url) => {
            setIsLoading(true);
            try{
                const response = await axios.get(url, {CancelToken: source.token});

                if(isMounted) {
                    setData(response.data)
                    setFetchError(null)
                }

            }catch(err){
                if(isMounted) {
                    setFetchError(err.msg)
                    setData([])
                }
            }finally{
                isMounted && setTimeout(() => setIsLoading(false), 2000)
            }
        }
        fetchdata(dataUrl);

        const cleanUp = () => {
            isMounted = false;
            source.cancel()
        }

        return cleanUp
    }, [dataUrl]);
  return {data, fetcherror, isLoading}
}

export default useAxiousFetch