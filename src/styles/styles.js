import styled from 'styled-components';

const Input = styled.TextInput`
  paddingHorizontal: 20px;
  paddingVertical: 15px;
  borderRadius: 5px;
  backgroundColor: #fff;
  alignSelf: stretch;
  marginBottom: 15px;
  marginTop:20px
  marginHorizontal: 20px;
  fontSize: 16px;
`;

const Touch = styled.TouchableHighlight`
  marginRight:40;
  marginLeft:40;
  marginTop:10;
  paddingTop:20;
  paddingBottom:20;
  backgroundColor:'#68a0cf';
  borderRadius:10;
  borderWidth: 1;
  borderColor: '#fff';

`;
export {
  Input,
  Touch
};