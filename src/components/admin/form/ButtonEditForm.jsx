import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// eslint-disable-next-line
import { Tag, Input, Checkbox, Space , Cascader} from 'antd';

//  data generator
const getItems = (count) => Array.from({ length: count }, (v, k) => k).map((k) => ({
  // id: `item-${k}`,
  // buttonName: `item${k}`,
  value: k,
  label: k,
}));

// eslint-disable-next-line
const ButtonEditForm = ({ getOnlineData, subBtnList }) => {

  // eslint-disable-next-line
  const btnItems = subBtnList?.sort((a, b) => a.sequence - b.sequence)?.map((btn) => ({
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
    ...draggableStyle,
  });

  // eslint-disable-next-line
  const getListStyle = (isDragging, isDraggingOver) => ({
    display: 'grid',
    gap: '0.5rem',
    gridTemplateColumns: 'repeat(5, 1fr)',
    overflow: 'auto',
  });

  // eslint-disable-next-line
  const btnStyle = (isDragging, isDraggingOver) => ({
    width: '100%',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDragging && '#a8071a',
    borderColor: isDragging && '#a8071a',
    color: isDragging && '#ff7875',
  });

  const handleEditInputChange = ({ target }) => {
    setState((prev) => ({
      ...prev,
      editInputValue: target.value,
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
                  <Input
                    key={item.id}
                    size="small"
                    className="tag-input"
                    value={editInputValue}
                    onChange={(e) => handleEditInputChange(e)}
                    onBlur={handleEditInputConfirm}
                    onPressEnter={handleEditInputConfirm}
                    autoFocus
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
                        style={btnStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                      >
                        <span
                          onDoubleClick={(e) => {
                            setState((prev) => ({
                              ...prev,
                              editInputIndex: index,
                              editInputValue: item.buttonName,
                            }));

                            e.preventDefault();
                          }}
                        >
                          {item.buttonName}
                        </span>
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
  );
};

export default ButtonEditForm;
