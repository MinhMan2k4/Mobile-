import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';

const IntroScreen = ({ navigation }: {navigation: any}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.replace('SignIn'); // Chuyển sang trang Sign In sau 3 giây
        }, 3000);
    
        return () => clearTimeout(timer); // Xóa timer khi component unmount
      }, [navigation]);
    
    return (
        <View style={styles.container}>
          {/* Logo */}
          <Image
            source={{ uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsJCQcJCQcJCQkJCwkJCQkJCQsJCwsMCwsLDA0QDBEODQ4MEhkSJRodJR0ZHxwpKRYlNzU2GioyPi0pMBk7IRP/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCAC0ALQDASIAAhEBAxEB/8QAGwABAQEAAwEBAAAAAAAAAAAAAAEGBAUHAgP/xABCEAACAgECBAQCBgUJCQEAAAAAAQIDBAURBhIhMRNBkfBRgRQiYXGhsQcyNJKzFRYjNUJSdYKiJDNzdIOjssHC0f/EABkBAQADAQEAAAAAAAAAAAAAAAACAwQFAf/EACQRAQACAgEDBAMBAAAAAAAAAAABAgMRIRITMQQUIjJBgaGx/9oADAMBAAIRAxEAPwD1sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhffce+4EBffce+4EBffce+4EBffce+4EBffce+4EBffce+4EBffce+4EBffce+4EBffce+4EBffce+4EBffce+4AD33AAAAQAAUhSACkKBAABSFIAKQoEAAFIUgApCgQAAUAAAQAUEAFBABQQAUEAFBABQQAUEAH45WVjYWPkZWTYq6KIOy2cvJLySXXd9kvM+6rFbVTalKKtrhYoy2UkpJSSe3mYHjXULMjJWm1y/oMaDlak+k8mcfPy+qmtvvfw6bfTrY36fpt0e1uHjWL/NXFlFMsXyTSPwOWCAvFBABQAAAAAHTapxHpOlSdNs53ZKSbox1GUobrdeJKTUV67/YZvJ46y+v0bCxqo+Usmydj+/aPIvxZRf1GOnEyN6R9Fu+iXffp+Z5n/L3GGp7xxp5covy0/Faiv8Aqxi3/rEOG+Ls+SnkVSjzdXPUMrml84xc5fgU+66vpWZHoF+qaRjJ/SM/Era/syur5vlFPf8AA667i3hupNxyrLmv7NFFrfrNRj+J0WPwJkPrlalXD4xxKN3+/a//AIO0p4K0GvZ2yzb2u/iX8kX8qYxJdee3isQONZx1hRl/RaflSh/essqrf7seb8zg3ce3ttUYOLD4eNkTsfpBRNPTw3w1S04aXiya87oO5+trkdhViYNG3gYuPXt28KmuG37qHRnnzb+DCLijjDL/AGXB6eTx8DJsX7020fazP0lXbctGXFP44+DV/EW5v/Ug7Fp83keeW4/6R5/Wl/KPRt7V5WNB+lViOVo9PHVmo4Ly559WHTbz5Ly7YOE61F7wUU22308unff47kp7HptTvqkAdfqmrYOk0q3JlJynzKmqvZ2WuPflTaWy6btv89nxNF4iwtZndTCqyjIqj4nh2OMuerdLnhKPw6brbzXxL+5WLdO+RhbN83XNVU+viS1trfyVVGRKHpsjb8JXeNoOnbvrT4+P8q7ZKP4bGPjV4GucTyk+WOHia/fu+n+8Tqh686NhwljWY2hYCmmpXu7K2a2ajdY5w/DZ/Mwemie5P7/2B3wAOkAAAAAB6H4ZcMm3Gya8a6NOROqcabXHnVc2ukuU/cHkxsYrE4I5rHbqmfO5yk5zrxVKHPJvdud1jc3v57JfeaPG0PQcTl8DTsOMo9pyqjZZ9/PZvL8TsgVUw46eIESSSS2SXRJdl8h6FBcJ6F9AAMTxpqWfRdiYNF06qZ4/0m11SlCdkueUYpzi99ltvtv5/Z01OlWWW6ZpNtknOyzBxbLJze8pSlVFuUn8WYzjlf7fp8v72FKP7tsv/wBNjo/9UaL/AIdh/wAGJjxzM57xI5/oT0KDYJ6F9AAPLdbty9X17KporndZG6WHi1V9XyUNxbW/RLfmk235nL4WxMzH4jlRdXKuzFxMv6TBtPlUvDilvF7dd011OdjRnoXE2q+Jh5WU8yi67Cjgwjdb4Vt/O202klv9Vttfqrye5zrLbtEx9R1XKrhPXdbvhXi4lclZyySVdGNFruodHN7JNv7t+XXH8u5aeYnkfS0jE1PV+J5uW+LZZpmJkqK6WSojHIuoUk+z2qU/mvu1CSSSSSSSSSWySXTZJHA0fBlp2BjY9k/EyHz35lr6u3Kuk7LZt/e3t9x2Bvx11G9cyJ6F9AC0T0HoUAPQAAAPQnoBQT0HoBQT0HoBQT0HoBgeOv2zTf8AlLv4hsNH/qjRf8Ow/wCDEyHHX7Zpi8/ol342I0mlalpNek6QrM/Cg4YONXJWZFUWpQrjGUWpPfdefQw45iM99jugdPbxJw3T+tqNMn3SoVl38KLRwbONNAhvyxzbNvOFMYr/ALs4/kaZzY6+bQNMDG/z3V8vD0/ScjJm+kUpuTT+2NEJ/mfov5/auuWSxtIxpraUtt8hxfwipSnv/mgQ79Z+nI41OvadjZ/EWsXy8W2+6vTdLxqnvbbTjLul12jOT3328uib6H64en8V5WfDWszG0/6R4e2JTm3XpYcJb9I00waUtn5y36vzfTttI4Z0nSXG6MZZGYlt9JyNnKPk/Cgvqx+XX7Tu/QhTFaebyM1q2XxFi4rnk4dd2P1d1mkZeVj3U7LvJuDly/avn8TI+Po+S1NahrmHdJ7899izqV9rlW4Xfmepmb1XhLTM5zuxX9DyZbyk6470WSfnOrdbP7U18yOfDe3NeR0eHq/EenLxY5NOsafDrY6rJW2Vx+MuZLIh/mi0a/S9Z03V6+fFt/pIxUraLNldX9rXZr7U2jAZHDXEuDYrIY07eR7wuwLOeS+1L6ti9DhxxeII5Ebq8LVIZKlurKsXIrmpfHeMEt/iZ6ZsmKdWiR66DOaJlcY2+HHUsGiNHTe/IsVOS1/walJN/eoGi9DpUv1xsUD0BMAABAUAcHU9SxNKw7czJltCLUIRTSlbbJPlrjv5v/1v5GLhx5qG7U8XAlu/qqudsZJeS/Wlv6I39lVN0eS6uuyG6fLZCM47rz2ktj4qxcOh7049FbfnVVCH/iijJTJafjbUDCvibjDN/YtPlFeTx8G+1/v27x/A+0/0mZcdmr6ovzm8HGf+j65vSEPb2n7XkeS6th6xi5ahqc5W5NlMLfE8WV+9bbivrvr02a22/M7nSuD5Z+Nj5mRlyx674+JXXTCE7ZVP9WUpz+qt++3K+/c5HF+JqEtQwr6se/Iqtorx6lj1ylKFsJzk4PlT7826b28/garRsfKxdK0zGy1GORTjwhZGDUlBrfaO66dFsvkZseCs5bRaNxA6irgrh+DTslnXbd/EyHFP5UxidhRw3w1jtSr0zGlJed0Xe/W5yO3BujDjr4gfFddVUVCquFcF2jXGMYr5R6H0UFogKABCgCF9QAICgAAAAAAgKABCgCFAAnvuCgAQoAhQAICgAQoAhQAICgAAAAAAAgAoBAKCFAAgAoBAKCFAAgAoBAKCFAAgAoAAAEAAACkAAFIAAAApAABSAAAAKQAAUgAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z' }} // Thay bằng URL của logo của bạn
            style={styles.logo}
          />
    
          {/* Text */}
          <Text style={styles.title}>fashion.</Text>
        </View>
      );
}

export default IntroScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
    },
    logo: {
      width: 60, // Tùy chỉnh kích thước logo
      height: 60,
      marginBottom: 20, // Khoảng cách giữa logo và tiêu đề
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#4A3B2E', // Màu chữ
      fontFamily: 'serif', // Phong cách font chữ
    },
  });