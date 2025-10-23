import { useState, useEffect } from 'react';
import "../styles/TagsBar.css";

// Forward the ref to access methods via useImperativeHandle
const TagsBar = ({ tags, onTagChange = null }) => {
  const [buttonSelected, setButtonSelected] = useState(tags[0]);

  // Notify parent about buttonSelected change
  useEffect(() => {
    if (onTagChange) 
      onTagChange(buttonSelected);
  }, [buttonSelected]);

  return (
    <div className='width-100 d-flex'>
      <div className='tags-flex-wrapper'>
        {tags.map((tag) => (
          <button
            key={tag}
            type='button'
            role='button'
            onClick={() => setButtonSelected(tag)}
            className={`tag-item m-0${buttonSelected !== tag ? " default-tag-item-color" : ""}`}
          >
            {tag}
          </button>
        ))}
      </div>
  </div>

  );
};

export default TagsBar;
