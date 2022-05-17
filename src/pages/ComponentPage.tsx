import Switch from '@/components/common/Switch';
import TextInput from '@/components/common/TextInput';
import { Component, createSignal } from 'solid-js';

const ComponentPage: Component = () => {
  const [disabled, setDisabled] = createSignal(false);

  return (
    <div>
      <Switch
        checked={disabled()}
        onChecked={setDisabled}
      >
        disable: {disabled().toString()}
      </Switch>
      <TextInput disabled={disabled()} />
    </div>
  )
};

export default ComponentPage;
