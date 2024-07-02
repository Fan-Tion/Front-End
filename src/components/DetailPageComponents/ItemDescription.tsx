import React from 'react'
import styled from 'styled-components'

const Divider = styled.hr`
  border: 1px solid #eee;
  width: 95%;
  border-color: black;
  border-style: solid;
  border-width: 1px 0 0 0;
`
export default function ItemDescription() {
  return (
    <div>
      <h3>상세 설명</h3>
      <Divider />
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam mollitia ipsum esse harum optio officia incidunt quod numquam, fuga non ut ullam voluptas! Eveniet id illo dicta a, deleniti aperiam?</p>
    </div>
  )
}
