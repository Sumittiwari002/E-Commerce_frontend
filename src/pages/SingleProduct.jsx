import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getDocs } from '../utilities/crudOperation';

export default function SingleProduct() {
    let {productid} = useParams();
    console.log(productid);
    (productid);
    let [record, setrecord] = useState({});
    let [status, setStatus] = useState(false);

    useEffect(()=>{
        getDocs('products/'+productid).then(response=>{
            console.log(response);
            console.log('fetch');
            setrecord(response.fields);
            setStatus(true);

        });
    },[productid]);
  return (
    <div className='container'>
        <h1>SingleProduct Data</h1>
        <hr/>
          {  status && (
                <div className='row'>
                    <div className='col-6'>
                        <img src={record.productImagePath.stringValue} className='img-fluid'/>

                    </div>
                    <div className='col-6'>
                        <h4>{record.productName.stringValue}</h4>
                        <h2>{record.productPrice.integerValue}</h2>
                        <p>{record.productDescription.stringValue}</p>
                        <button>Add To Cart</button>

                    </div>
                </div>
            )
        }
    </div>
  )
}
