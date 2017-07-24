import React from 'react'
import Multiselect from 'react-widgets/lib/Multiselect'

export const RenderMultiselect = (({ input, meta, ...rest }) => {

    return <Multiselect {...input}
      onBlur={() => input.onBlur()}
      value={input.value || []} // requires value to be an array
      {...rest}/>
})
