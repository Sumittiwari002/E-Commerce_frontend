import firestoreApi from "../settings/apiSetting";

async function getDocs(collectionName,docId=''){

    // let apiPath = (docId == "") ? `${collectionName}` :` ${collectionName}/${docId}`;
    let apiPath =(docId === "")? `${collectionName}`: `${collectionName}/${docId}`;
    console.log(apiPath);
    try{
        const response = await firestoreApi.get(apiPath);
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.error("Error fetching documents:", error);
        throw error;
    }
   
}

async function addDocs(collectionName,values, keyName){

    console.log(collectionName);
    console.log(values);
    console.log(keyName);

    const payload = {
        fields: {
            [keyName]: { stringValue: values[keyName] }
        }
    };
    console.log(payload);    
    const response = await firestoreApi.post(`/${collectionName}`, payload);
    console.log(response);
    
    return response;

    
}

// async function createDoc(collectionName, values) {
//     const payload = {
//         fields: {
//             userName: { stringValue: values.userName },
//             userPlace: { stringValue: values.userPlace }
//         }
//     };
    
//     // Note: Use firestoreApi instance if you have a pre-configured Axios/Fetch client
//     const response = await firestoreApi.post(`/${collectionName}`, payload);
//     console.log('Created:', response.data || response);
//     return response;
// }



export {
    getDocs, addDocs
}