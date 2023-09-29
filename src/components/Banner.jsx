import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import {AiFillPlayCircle} from 'react-icons/ai';
import {PiTelevisionSimpleBold} from 'react-icons/pi';

const Banner = () => {
  const slides = [
    {
        img:'john-wick-3-parabellum_16.webp',
        title1:"John Wick 3:",
        title2:"Parabellum",
        imd:"86.0/100",
        tomatos:"97%",
        resumen:`John Wick regresa de nuevo pero con una recompensa sobre su cabeza <br>
                 que persigue unos mercenarios. Tras asesinar a uno de los miembros <br>
                 de su gremio, Wick es expulsado y se convierte en el foco de <br>
                 atención de todos los sicarios de la organización.`,
        trailer:"https://www.youtube.com/watch?v=L0anWmmd8TI"
    },
    {
        img:'shazam-banner2.jpg',
        title1:"!Shazam!",
        title2:"Furia de los dioses",
        imd:"78.0/100",
        tomatos:"85%",
        resumen:`Regresa Billy Batson (Asher Angel), un joven huérfano de 14 años,<br>
                 normal y corriente, al que le cambia la vida por completo el<br> 
                 convertirse en el superhéroe adulto Shazam (Zachary Levi) cada<br>
                 vez que grita la palabra ¡Shazam!`,
        trailer:"https://www.youtube.com/watch?v=uPw3tgWfRNk"
    }, 
    {
        img:'the-flash-banner.jpg',
        title1:"The Flash",
        title2:"2023",
        imd:"60.0/100",
        tomatos:"75%",
        resumen:`Los mundos chocan en "Flash" cuando Barry utiliza sus superpoderes<br>
                 para viajar en el tiempo y cambiar los acontecimientos del pasado.<br> 
                 Barry intenta salvar a su familia, pero sin saberlo altera el <br>
                 futuro y queda atrapado en otra realidad`,
        trailer:"https://www.youtube.com/watch?v=LmC5pxr9JZY"
    }];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className='max-w-[1600px] h-[780px] w-full m-auto  relative group'>
      <div className="relative w-full h-full">
        <img
          src={slides[currentIndex].img}
          alt="Slide"
          className='w-full h-full rounded-2xl  duration-500 object-scale-down'
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
        {/* Agregar superposición oscura */}
            <div
             className="absolute w-full h-full top-0 left-0 bg-black opacity-40"
            ></div>
        {/* Fin de superposición oscura */}

        {/* Left Arrow */}
        <div className='z-10 hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className='z-10 hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className='absolute bottom-2 left-0 right-0 flex justify-center'>
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`text-2xl cursor-pointer ${slideIndex === currentIndex ? 'text-white' : 'text-gray-500'}`}
            >
              <GoDotFill className="w-10 h-10" />
            </div>
          ))}
        </div>

        {/* Texto dentro del banner */}
        

        <div className="absolute bottom-1/3 left-[8%] text-white">
          <div className="md:mt-0 mt-4 mb-10 flex items-center space-x-2 ">
            <div className="bg-red-700 rounded-full p-2">
                <div className=" bg-red-600 rounded-full p-2">
                    <PiTelevisionSimpleBold className="text-white w-6 h-6" />
                </div>
            </div>
           <h1 className="text-2xl font-bold">MovieBox</h1>
          </div>
          <h1 className="text-4xl font-bold ">{slides[currentIndex].title1}</h1>
          <h2 className="text-4xl font-bold ">{slides[currentIndex].title2}</h2>
          <div className="flex items-center space-x-2 mt-2">
            <img src="imdb.png" className="w-10 h-10" alt="IMDb" />
            <p className="text-lg">{slides[currentIndex].imd}</p>
            <img src="tomato.png" className="w-4 h-4" alt="Tomato" />
            <p className="text-lg">{slides[currentIndex].tomatos}</p>
          </div>
          <p className="md:flex hidden text-lg" dangerouslySetInnerHTML={{ __html: slides[currentIndex].resumen }}></p>
          <a
            href={slides[currentIndex].trailer}
            className="text-xl bg-red-800 hover:bg-red-700 text-white py-2 px-4 rounded-md mt-4 inline-flex items-center"
            >
            <AiFillPlayCircle className="w-5 h-5 mr-2" /> WATCH TRAILER
          </a>
        </div>

        {/* /////////////////////// */}

      </div>
    </div>
  )
}

export default Banner;