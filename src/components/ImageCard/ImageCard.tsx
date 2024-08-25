import s from './ImageCard.module.css'

const ImageCard = ({ image, openModal }) => {
   const handleClick = () => {
    openModal(image);
  };
  return (
    <div onClick={handleClick}>
      <img src={image.urls.small} alt={image.description} className={s.img} />
    </div>
  )
}

export default ImageCard