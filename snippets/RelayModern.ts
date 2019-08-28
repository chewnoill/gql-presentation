const UserProfile = Relay.createFragmentContainer(
 // View: A React component (functional or class)
 props => {
  const user = props.data
  return (
   <View>
    <Text>{user.name}</Text>
    <Image src={{ uri: user.photo.uri }} />
   </View>
  )
 },
 // Data: A GraphQL fragment
 // The shape of the fragment matches what is expected in props.
 graphql`
  fragment UserProfile on User {
   name
   photo {
    uri
   }
  }
 `
)
