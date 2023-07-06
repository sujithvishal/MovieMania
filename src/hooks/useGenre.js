

const useGenre = (selectedGenre)=>{

  if(selectedGenre.length<1)return ''

  const ids = selectedGenre.map(genre=>genre.id);

  return ids.reduce((acc,curr)=>acc+','+curr);

}

export default useGenre;