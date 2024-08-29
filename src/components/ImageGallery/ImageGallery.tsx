import { ReactElement } from 'react';
import { Image } from '../App'
import ImageCard from '../ImageCard/ImageCard'
import s from './ImageGallery.module.css'

interface ImageGalleryProps {
  images: Image[];
  openModal: (image: Image) => void;
}

const ImageGallery = ({images, openModal}:ImageGalleryProps):ReactElement => {
  return (
    <ul className={s.imageList}>
      {images.map((image) => {
        return (
          <li key={image.id} className={s.imageItem}>
            <ImageCard image={image} openModal={openModal}/>
          </li>
        )
      }
      )}
      </ul>
  )
}

export default ImageGallery