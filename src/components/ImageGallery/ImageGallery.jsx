import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import css from "./ImageGallery.module.css"
import PropTypes from "prop-types"



export const ImageGallery = ({ images, openModal }) => (
    <ul className={css.gallery}>
        {images.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
                key={id}
                tags={tags}
                src={webformatURL}
                largeImageURL={largeImageURL}
                openModal={openModal}/>
            ) )}
    </ul>
)

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            tags: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
             })
    ),
    openModal: PropTypes.func,
}
   