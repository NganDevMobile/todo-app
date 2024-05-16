import { STATUS } from '@constants/status';
import NetInfo from '@react-native-community/netinfo';
import { colors } from 'utils/colors';

export const isNetworkConnected = async () => {
  const state = await NetInfo.refresh();
  return state.isConnected || false;
};

export function getColorByStatus(status: string) {
  switch (status?.toLowerCase()) {
    case STATUS.COMPLETE:
      return {
        bgTag: colors.statusComplete,
        text: colors.complete,
        bg: colors.bgComplete,
      };

    case STATUS.PENDING:
      return {
        bgTag: colors.statusPending,
        text: colors.pending,
        bg: colors.bgPending,
      };

    case STATUS.CANCELED:
      return {
        bgTag: colors.statusCanceled,
        text: colors.canceled,
        bg: colors.bgCanceled,
      };

    case STATUS.ON_GOING:
      return {
        bgTag: colors.statusOnGoing,
        text: colors.textOnGoing,
        bg: colors.bgOnGoing,
      };

    default:
      return {
        bgTag: colors.statusComplete,
        text: colors.complete,
        bg: colors.bgComplete,
      };
  }
}

export function getByPriority(priority: number) {
  switch (priority) {
    case 1:
      return {
        bg: colors.statusCanceled,
        text: colors.canceled,
        title: 'Urgent',
      };

    case 2:
      return {
        bg: colors.priorityHigh,
        text: colors.textHigh,
        title: 'High',
      };

    case 3:
      return {
        bg: colors.priorityNormal,
        text: colors.textNormal,
        title: 'Normal',
      };

    default:
      return { bg: colors.grayBackground, text: colors.disable };
  }
}
