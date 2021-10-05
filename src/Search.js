import React,{useState,useRef} from 'react';

const Search = () =>{
  const searchInput = useRef();
  let FAILURE_COEFF = 10;
  let MAX_SERVER_LATENCY = 200;
  const [autoSuggestionList,setAutoSuggestionList] = useState([]);
  
  const getRandomBool=(n)=> {
    var maxRandomCoeff = 1000;
    if (n > maxRandomCoeff) n = maxRandomCoeff;
    return Math.floor(Math.random() * maxRandomCoeff) % n === 0;
  }

  // autosuggest api
  const getSuggestions=(text)=> {
    var pre = 'pre';
    var post = 'post';
    var results = [];
    if (getRandomBool(2)) {
      results.push(pre + text);
    }
  if (getRandomBool(2)) {
      results.push(text);
    }
    if (getRandomBool(2)) {
      results.push(text + post);
    }
    if (getRandomBool(2)) {
      results.push(pre + text + post);
    }
    return new Promise((resolve, reject) => {
      var randomTimeout = Math.random() * MAX_SERVER_LATENCY;
      setTimeout(() => {
        if (getRandomBool(FAILURE_COEFF)) {
          reject();
        } else {
          resolve(results);
        }
      }, randomTimeout);
    });
  }

  //search handler
  const searchHandler = async() =>{
    if(searchInput.current.value!==''){
      try{
        const results= await getSuggestions(searchInput.current.value);
        setAutoSuggestionList(results);
      } catch(e){
        console.log('error',e)
      }
    }else{
      setAutoSuggestionList([]);
    }
  }
  return (
    <div>
    <p>Search</p>
    <input
      onKeyUp={searchHandler}
      type="text"
      ref={searchInput}
    />
   { autoSuggestionList.length!==0 &&
   <div className='autosuggestionWrapper'>
      {
        autoSuggestionList?.map(
          (item,index)=>
          <p key={index}>{item}</p>
          )
      }
    </div>}
  </div>
);
}
export default Search;
