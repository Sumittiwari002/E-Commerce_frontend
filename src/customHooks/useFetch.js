import {useState, useEffect} from 'react';
import {getDocs} from '../utilities/crudOperation';

export default function useFetch(collectName) {
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);

    useEffect(()=>{
        setLoading(true);
        getDocs(collectName)
          .then((res)=>{
              setData(res.documents || []);
          })
          .catch((err)=>{
              console.error(`useFetch(${collectName}) failed:`, err);
              setError(err);
          })
          .finally(()=> setLoading(false));
    },[collectName]);

  return data; // consider returning { data, loading, error } instead
}