import { ImageList, ImageListItem } from "@mui/material";

const ImageGallery = ({images = []}: any) => {
  return (
    <ImageList sx={{ width: '100%', height: 450 }} cols={4} rowHeight={150}>
      {images.map((image: any) => (
        <ImageListItem key={image}>
          <img
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            alt='Imagen de la nota'
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default ImageGallery
