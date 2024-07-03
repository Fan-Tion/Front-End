import React from 'react'
import styled from 'styled-components'

const Divider = styled.hr`
  border: 1px solid #eee;
  width: 98%;
  border-color: black;
  border-style: solid;
  border-width: 1px 0 0 0;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`

const Description = styled.p`
  margin: 30px;
  text-align: start;
`

export default function ItemDescription() {
  return (
    <Wrapper>
      <Divider />
      <h3>Description</h3>
      <Description>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ipsa iure assumenda quos sunt, obcaecati asperiores dignissimos dolor, soluta hic rerum? Distinctio tenetur fugiat possimus ex nulla, aliquam tempora at!
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam mollitia ipsum esse harum optio officia incidunt quod numquam, fuga non ut ullam voluptas! Eveniet id illo dicta a, deleniti aperiam?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nihil consectetur accusantium iure tempora necessitatibus quaerat quos. Distinctio nam minima, ullam iste deleniti, laborum sapiente blanditiis quas autem atque at?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, beatae officiis temporibus, dicta repudiandae facilis provident qui, nemo quisquam deleniti saepe vero sint fuga quaerat illum fugiat? Culpa, eveniet aperiam.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias vel minus, repellat tenetur expedita, aliquid quo deserunt in doloremque voluptates dolorum corporis consequatur optio beatae aperiam! Ad pariatur facere in.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem perspiciatis, deleniti fugit beatae dicta eum velit eveniet architecto consequatur nostrum harum sit, sunt exercitationem, rerum quaerat doloribus possimus necessitatibus! Perspiciatis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iure quos quas minima odio ratione accusantium fugit ad velit sed, commodi harum aperiam voluptatibus mollitia minus? Distinctio temporibus fuga magni.
      </Description>
    </Wrapper>
  )
}
