import React from 'react';

export default function ContentEditorToolbarComponent(): JSX.Element {
  const Button = ({ className }: { className: string }): JSX.Element => (
    <button
      type="button"
      className={className}
    />
  );

  return (
    <div id="ql-custom-toolbar">
      <Button className="ql-bold" />
      <Button className="ql-italic" />
      <Button className="ql-underline" />
      <Button className="ql-image" />
    </div>
  );
}
