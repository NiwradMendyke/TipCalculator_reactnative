/*
  Import statements necessary to make our application run
*/
import React, { Component } from 'react';
import {
   StyleSheet,
   Text,
   View,
   TextInput,
   Button,
   Keyboard
} from 'react-native';

class App extends Component {
   state = {
      billAmount: 0,
      tip: 0,
      totalValue: 0
   }

   textChange = (value) => {
      // value is a string so we convert value to a float (number with decimals)
      value = parseFloat(value || 0);

      // Store this new value in our application's state
      this.setState({
         billAmount: value
      });
   }

   floorFigure = (figure, decimals) => {
      if (!decimals) decimals = 2;
      var d = Math.pow(10,decimals);
      return (parseInt(figure*d)/d).toFixed(decimals);
   }

   calculateTip = (proportion) => {
      billAmount = this.state.billAmount;
      billAmount = Math.round(billAmount * 100) / 100;
      tip = proportion * billAmount;
      tip = Math.round(tip * 100) / 100;

      // Now that we've calculated the tip and total value, we store it in our
      // app state
      this.setState({
         tip: this.floorFigure(tip, 2),
         totalValue: this.floorFigure(billAmount + tip, 2)
      })

      // Used to hide the phone keyboard
      Keyboard.dismiss();
   }

   /*
      Render function for React components.
      App will be re-rendered when state or props changes
   */
   render() {
      return (
         <View style={styles.container}>
            <Text style={styles.title}>Tip Calculator</Text>

            <TextInput
               style={styles.billInput}
               autoFocus={true}
               keyboardType='numeric'
               onChangeText={this.textChange}
               placeholder='Bill Amount'
            />

            <View style={styles.tipButtonContainer}>
               <Button title="2.5%"
                  onPress={()=>{
                     this.calculateTip(0.025);
                  }} />

               <Button title="10%"
                  onPress={()=>{
                     this.calculateTip(0.1);
                  }} />

               <Button title="25%"
                  onPress={()=>{
                     this.calculateTip(0.25);
                  }} />

               <Button title="50%"
                  onPress={()=>{
                     this.calculateTip(0.5);
                  }} />
            </View>

            <Text style={styles.tipLabel}>Tip: ${this.state.tip}</Text>
            <Text style={styles.totalLabel}>Total: ${this.state.totalValue}</Text>
         </View>
      );
   }
}

/*
   Styles for our tip calculator
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20
  },
  billInput: {
    width: '80%',
    height: 80,
    fontSize: 28,
    borderColor: '#ccc',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  tipButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#ccc',
    borderBottomWidth: 1
  },
  tipLabel: {
    fontSize: 28,
    marginTop: 20
  },
  totalLabel: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 20
  }
});

export default App;
