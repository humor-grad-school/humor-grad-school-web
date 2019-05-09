import React from 'react';
import { formatString } from '../../contentConverter/Blot';

export default function ContentEditorToolbarComponent({
  allowedFormats,
}: {
  allowedFormats: formatString[];
}): JSX.Element {
  function isAllowedFormat(formatName: formatString): boolean {
    return allowedFormats.includes(formatName);
  }

  const Button = ({ formatName }: { formatName: formatString }): JSX.Element | null => (
    isAllowedFormat(formatName)
      ? (
        <button
          type="button"
          className={`ql-${formatName}`}
        />
      )
      : null
  );

  return (
    <div id="ql-custom-toolbar">
      <Button formatName="bold" />
      <Button formatName="italic" />
      <Button formatName="underline" />
      <Button formatName="image" />
    </div>
  );
}
