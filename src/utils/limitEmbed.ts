import { DeltaOperation } from 'quill';

type embedIndex = {
  [key: string]: number;
  image: number;
}

export default function limitEmbed(
  ops: DeltaOperation[] | undefined,
  limit: embedIndex,
): DeltaOperation[] | null {
  const embedKeys = [
    'image',
  ];

  const counter: embedIndex = {
    image: 0,
  };

  let limitedFlag = false;

  const limitedOps = (ops || []).filter((op) => {
    const { insert } = op;
    if (!insert || typeof insert === 'string') {
      return true;
    }

    const keys = Object.keys(insert);

    const isBelowLimit = embedKeys.every((embedKey) => {
      const hasNoEmbed = !keys.includes(embedKey);
      if (hasNoEmbed) {
        return true;
      }

      const hasLimit = limit[embedKey] >= 0;
      const isReachedLimit = counter[embedKey] >= limit[embedKey];
      if (hasLimit && isReachedLimit) {
        limitedFlag = true;
        return false;
      }

      counter[embedKey] += 1;
      return true;
    });

    return isBelowLimit;
  });

  return limitedFlag
    ? limitedOps
    : null;
}
