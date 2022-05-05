import React, { useState, useEffect } from 'react';

// Drop
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Prop types
import PropTypes from 'prop-types';

// Antd
import {
  Tag, Checkbox, Space, Cascader, AutoComplete, Divider,
} from 'antd';

// Config
import { subBtnOptions } from '../../../config/config';

//  data generator
const getItems = (count) => Array.from({ length: count }, (v, k) => k).map((k) => ({
  value: k,
  label: k,
}));

//

const ButtonEditForm = ({ getOnlineData, subBtnList, brand }) => {
  // eslint-disable-next-line
  const btnItems = subBtnList
    ?.sort((a, b) => a.sequence - b.sequence)
    ?.map((btn) => ({
      id: `${btn.id}`,
      buttonName: btn.button_name,
      spin_effect: btn?.spin_effect || 0,
      code: btn?.code || 0,
    }));

  const [state, setState] = useState({
    buttons: btnItems,
    editInputIndex: -1,
    editInputValue: '',
  });

  // reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      state.buttons,
      result.source.index,
      result.destination.index,
    );

    setState((prev) => ({
      ...prev,
      buttons: items,
    }));
  };

  // eslint-disable-next-line
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    color: isDragging && '#a8071a',
    border: isDragging ? '1px solid #a8071a' : '1px solid #262626',
    // backgroundColor: isDragging ? 'red' : '#1f1f1f',
    ...draggableStyle,
  });

  // eslint-disable-next-line
  const getListStyle = (isDragging, isDraggingOver) => ({
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(10, 1fr)',
    overflow: 'auto',
    backgroundColor: isDragging ? '#262626' : '#1f1f1f',
    padding: '1rem',
  });

  // eslint-disable-next-line
  const btnStyle = (isDragging, isDraggingOver) => ({
    width: '100%',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: isDragging && '#a8071a',
  });

  const handleEditInputChange = (value) => {
    setState((prev) => ({
      ...prev,
      editInputValue: value,
    }));
  };

  const handleEditInputConfirm = () => {
    setState((prev) => {
      const { editInputValue, editInputIndex } = prev;

      const { buttons } = prev;

      if (buttons.includes(editInputValue)) {
        return {
          ...prev,
          buttons,
          editInputIndex: -1,
          editInputValue: '',
        };
      }

      const newButtons = [...buttons];

      newButtons[editInputIndex].buttonName = editInputValue;

      return {
        ...prev,
        buttons: newButtons,
        editInputIndex: -1,
        editInputValue: '',
      };
    });
  };

  const spinEffectOnChange = ({ target }) => {
    const targetIndex = target?.id;
    setState((prev) => {
      const { buttons } = prev || {};
      buttons[targetIndex].spin_effect = Number(target.checked);
      return {
        ...prev,
      };
    });
  };

  const spinCodeOnChange = ({ value, index }) => {
    setState((prev) => {
      const { buttons } = prev || {};
      buttons[index].code = value[0];
      return { ...prev };
    });
  };

  useEffect(() => {
    const { buttons } = state;

    const buttonsFormat = buttons.map((el, index) => ({
      buttonName: el.buttonName,
      sequence: index + 1,
      spin_effect: el?.spin_effect || 0,
      code: el?.code || 0,
      id: el.id,
    }));

    getOnlineData({
      buttons: buttonsFormat,
    });

    // eslint-disable-next-line
  }, [state]);

  return (
    <>
      <Divider orientation="left">按鈕</Divider>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {state.buttons.map((item, index) => {
                const { editInputValue } = state;
                if (state.editInputIndex === index) {
                  return (
                    <AutoComplete
                      key={item.id}
                      size="small"
                      className="tag-input"
                      value={editInputValue}
                      onChange={handleEditInputChange}
                      onBlur={handleEditInputConfirm}
                      // onPressEnter={handleEditInputConfirm}
                      autoFocus
                      style={{ width: '100%', margin: 'auto' }}
                      options={subBtnOptions[brand]}
                    />
                  );
                }
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {/* eslint-disable-next-line */}
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                      >
                        <Space>
                          <span>{`#${index + 1}`}</span>
                          <Checkbox
                            checked={item.spin_effect === 1}
                            id={index}
                            onChange={spinEffectOnChange}
                          />
                        </Space>

                        <Tag
                          className="edit-tag"
                          key={item}
                          onDoubleClick={(e) => {
                            setState((prev) => ({
                              ...prev,
                              editInputIndex: index,
                              editInputValue: item.buttonName,
                            }));

                            e.preventDefault();
                          }}
                          style={btnStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                          )}
                        >
                          <span>{item.buttonName}</span>
                        </Tag>

                        <Cascader
                          style={{ width: '100%' }}
                          options={getItems(10)}
                          onChange={(value) => spinCodeOnChange({ value, index })}
                          placeholder="Please select"
                          defaultValue={[item?.code || 0]}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

ButtonEditForm.propTypes = {
  getOnlineData: PropTypes.func.isRequired,
  subBtnList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  brand: PropTypes.string,
};

ButtonEditForm.defaultProps = {
  brand: '',
  subBtnList: null,
};

export default ButtonEditForm;
