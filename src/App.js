import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
function App() {
  const [people,setPeople] = useState(data);
  const [index,setIndex] = useState(0);

  useEffect(()=>{
    const lastIndex= people.length-1; //length ki spelling kai bar galat ho jati h yr

    if(index<0)
    {
      setIndex(lastIndex);
    }
    if(index>lastIndex)
    {
      setIndex(0);
    }
  },[index,people])  // useEffect tb tb chalega jb ya to data i.e people array me change aya ho
  //ya index change ho rha ho , dependency array ka yhi kam to h , useEffect ko btana ki kya change hone pr 
  //use render hona h // [] empty ka mtlab jb re render ho to bs ek bar chalna h 
  //index-1 index+1 -ve ya out of bound na jaye usko control krne ke liye hm useeffect ka use kr rhe 
  //puaran dekho useEffect has many more benefits as well. // Also can handle index usign logic in inline
  //as well ,but as of now useEffect se hi kr dete h

  //we can put as many useEffect as we want. //For auto we will use useEffect again
  useEffect(()=>{
    let slider = setInterval(()=>{
      setIndex(index+1);//automatic index will change , and so useeefect will re render
    },5000)
    return ()=> clearInterval(slider); // setInteval ke result ko clear krna pdega 
    //otherwise wo button click krne pr bhi useEffect render krdega , and then we will have many 
    // returns and our application will go berserk .that is also when clear function becomes handy in 
    // useEffect ,every time empty dependancy array can not handle multiple returns 
  },[index])
  return (
    <section className="section">
      <div className="title">
        <h2>
          <span></span> Image Gallery
        </h2>
      </div>
      <div className="section-center">
        {/* //upar wale index variable ki madad sare slides  ko handle krnege , kisko side me rakhna
        h kisko show krna sb whi index decide krega , jise hm buttons ki madad se chage krte rhenge */}
        {/* Poora list rhega webiste pr hmse hidden rhega , CSS se show krenge, aur sara khel karenge
        Dynamic Css Use kreng e */}
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;
          //more stuff coming , let just make return
          //Most Important point Yhi se Start h ,Basically Slider kaise bnta h .
          // Using nextSlide activeSlide and lastSlide , which we control by dynamic CSS
          let position = "nextSlide"; //sb ek taraf
          if (personIndex === index) {
            // jo current index h upar state variable wala usko active middle pr
            position = "activeSlide";
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.lenght - 1)
          ) {
            //jo current se 1 piche wala , ya fir agr curr index =0 h to last wale ko lastSlide rakho i.e left pr
            position = "lastSlide";
          }
          return (
            <article key={id} className={position}>
              <img src={image} alt={title} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="quote">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
