import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import theme from './theme';
import * as Svg from '../assets/images/svg';

const Card = ({ title, description, icon, onPress, showButton = true,SvgIcon }) => {
  const { width } = useWindowDimensions();

  // Function to strip HTML tags and trim whitespace
  const stripHtml = (html) => html.replace(/<[^>]*>/g, '').trim();

  // ❗️If no title and no meaningful description, don't render the card at all
  if (!description || stripHtml(description) === '') {
    return null;
  }

  const isHtml =
    typeof description === 'string' && /<\/?[a-z][\s\S]*>/i.test(description);

  const renderDescription = () => {
    if (!description) return null;

    if (isHtml) {
      return (
        <RenderHtml
          contentWidth={width}
          source={{ html: description }}
          baseStyle={styles.description}
        />
      );
    }

    return <Text style={styles.description}>{description}</Text>;
  };

  const hasDescription = !!description;

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.content}>
        {title ? <Text style={styles.title}>{title}</Text> : null}

        {renderDescription()}

        {showButton && (
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Get started</Text>
            <View style={{ marginLeft: 5 }}>
              <Svg.RightArrow />
            </View>
          </TouchableOpacity>
        )}
      </View>

     {hasDescription && (
  <View style={styles.iconWrapper}>
    {SvgIcon && <View style={styles.svgIcon}>{SvgIcon}</View>}
    {icon && <Image source={icon} style={styles.icon} resizeMode="contain" />}
  </View>
)}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: theme.horizontalSpacing.space_16,
    borderRadius: 12,
    marginVertical: 8,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: theme.fontSizes.size_16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    width: 231,
  },
  description: {
    fontSize: theme.fontSizes.size_14,
    color: 'gray',
    marginBottom: 12,
  },
  button: {
    borderRadius: 8,
    width: 130,
    flexDirection: 'row',
    alignItems: 'center',
    height: theme.verticalSpacing.space_40,
  },
  buttonText: {
    fontSize: theme.fontSizes.size_16,
    fontWeight: '700',
    color: theme.lightColor.blackColor,
  },
  icon: {
    width: 64,
    height: 64,
  },
  iconWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
},
svgIcon: {
  width: 32,
  height: 32,
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight:theme.horizontalSpacing.space_16
},

});

export default Card;
