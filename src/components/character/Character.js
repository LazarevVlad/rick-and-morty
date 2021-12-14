import { Image, Heading } from '@chakra-ui/react';
import styles from './character.module.css';

export const Character = (props) => {
  const {obj, onCharacterClick} = props;

  const handleClick = () => {
    onCharacterClick(obj.image, obj.name, obj.status, obj.species, obj.type, obj.gender)
  }

  return (
    <div onClick={handleClick} className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={obj.image} alt={obj.name} className={styles.img}/>
      </div>
      <Heading as='h3' size='md' marginTop='10px'>{obj.name}</Heading>
    </div>
  )
}