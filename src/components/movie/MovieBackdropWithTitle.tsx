import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { AppText } from '../common';
import ProgressiveImage from '../ProgressiveImage';
import InnerShadow from '../InnerShadow';
import { getW185ImageUrl, getW1280ImageUrl } from '../../api/urls';
import { theme } from '../../theme';

/* ------------- Local ------------- */
const { width } = Dimensions.get('window');
export const movieBackdropWithTitleHeight = width / theme.specifications.backdropAspectRation;

/* ------------- Props and State ------------- */
type Props = {
  title: string;
  backdropPath: string;
};

/* ------------- Class ------------- */
const MovieBackdropWithTitle: React.FC<Props> = props => {
  const { backdropPath, title } = props;
  const [source, thumbnailSource] = React.useMemo(
    () => [{ uri: getW1280ImageUrl(backdropPath) }, { uri: getW185ImageUrl(backdropPath) }],
    [backdropPath],
  );

  return (
    <View style={styles.container}>
      <ProgressiveImage resizeMode="cover" style={styles.image} source={source} thumbnailSource={thumbnailSource} />
      <InnerShadow position="bottom" hexColor={theme.colors.background} startOpacity={1} size={120} />
      <View style={styles.titleWrapper}>
        <AppText type="title2">{title}</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width,
    height: movieBackdropWithTitleHeight,
    backgroundColor: theme.colors.transparentBlack,
  },
  titleWrapper: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.tiny,
  },
});

export default React.memo(MovieBackdropWithTitle);
