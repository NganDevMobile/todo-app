import { sizeScale } from '@common/Scale';
import { MediumText, RegularText, SemiboldText } from '@components/Text';
import { Layout } from '@theme';
import icons from '@theme/icons';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors } from 'utils';
import { getByPriority, getColorByStatus } from 'utils/helper';

interface PropItem {
  name: string;
  description: string;
  status: string;
  priority: number;
  index: number;
  isToday?: boolean;
  categoryName?: string;
  onPress: () => void;
  onLongPress: () => void;
}

const TaskItem = (props: PropItem) => {
  const {
    name,
    description,
    status,
    priority,
    onPress,
    onLongPress,
    categoryName,
  } = props;

  const statusObject = getColorByStatus(status);

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.itemContainer}>
        <View style={Layout.rowBetween}>
          <View style={Layout.row}>
            <View
              style={[styles.line, { backgroundColor: statusObject.text }]}
            />

            <View style={{ marginHorizontal: sizeScale(10), flex: 1 }}>
              <SemiboldText style={styles.nameTask} numberOfLines={1}>
                {name}
              </SemiboldText>
              <MediumText style={styles.textTime} numberOfLines={1}>
                {description}
              </MediumText>
            </View>

            <TouchableOpacity onPress={onLongPress}>
              <View style={styles.moreButton}>
                <FastImage source={icons.more} style={styles.more} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.tagContainer]}>
          <View
            style={[
              styles.tagStyle,
              { backgroundColor: getByPriority(priority).bg },
            ]}
          >
            <RegularText style={{ color: getByPriority(priority).text }}>
              {getByPriority(priority).title}
            </RegularText>
          </View>
          <View
            style={[
              styles.tagStyle,
              {
                marginLeft: sizeScale(6),
                backgroundColor: statusObject.bgTag,
              },
            ]}
          >
            <RegularText style={{ color: statusObject.text }}>
              {categoryName}
            </RegularText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  itemContainer: {
    padding: sizeScale(16),
    marginTop: sizeScale(16),
    borderRadius: sizeScale(16),
    backgroundColor: colors.primary + '10',
  },
  container: {
    padding: sizeScale(16),
    backgroundColor: colors.grayBackground,
  },
  line: {
    height: 36,
    backgroundColor: colors.primary,
    width: sizeScale(2),
    borderRadius: 2,
    alignSelf: 'center',
  },
  iconMore: {
    width: sizeScale(14),
    height: sizeScale(14),
  },
  nameTask: {
    fontSize: sizeScale(16),
    color: colors.textColor,
  },
  textTime: {
    color: colors.textGray,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: sizeScale(10),
    marginTop: sizeScale(8),
  },
  tagStyle: {
    paddingHorizontal: sizeScale(8),
    paddingVertical: sizeScale(2),
    borderRadius: sizeScale(4),
  },
  moreButton: {
    width: sizeScale(24),
    height: sizeScale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  more: {
    width: sizeScale(16),
    height: sizeScale(16),
  },
});
