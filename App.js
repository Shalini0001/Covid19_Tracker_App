import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';

import { StyleSheet, Text, View, TextInput, ScrollView , Image} from "react-native";
const NewTable = () => {


  const [data, setData] = useState();
  const [Search, setSearch] = useState("");
  const url = "https://api.covid19api.com/summary";

  useEffect(() => {
    const fetchCovidData = async () => {
      
      try {
        const result = await fetch(url);
        const response = await result.json();
        setData(response)
       
      }
      catch (e) {
        console.log(e)
      }
    }
    fetchCovidData();
  }, []);

  return (
    <View style={{height:'100%', width:'100%' }}>
       <View style={{ alignItems: 'center', backgroundColor:'white', padding:10 }}>
        <Text style={{ color: '#9400D3', fontSize: 25, fontWeight: 'bold' }}>Covid Tracker Dashboard</Text>
      </View>
      <View >
        <View style={{borderWidth:1, borderRadius: 10, margin:'5%',marginTop:'5%', flexDirection:'row', justifyContent:'flex-start'}}>
          <Image source={require('../Covid19_Tracker_App/assets/search.png')} style={{height:50, width:50}}></Image>
        <TextInput value={Search} placeholder="Search Here..." placeholderTextColor='black' onChangeText={(s) => setSearch(s)}/>
        </View>
        {data === undefined || Search.length > 0 ? null : (
          <ScrollView>
            <DataTable style={{color:'black'}}>
              <Text style={{fontSize:20, fontWeight: 'bold', color:'#9400D3'}}>Global</Text>
              <DataTable.Header style={{justifyContent:'space-evenly', color:'black'}}>
                {/* <DataTable.Title>NewConfirmed</DataTable.Title>
                <DataTable.Title >NewDeaths</DataTable.Title>
                <DataTable.Title numeric>NewRecovered</DataTable.Title> */}
                <DataTable.Title numeric >TotalConfirmed</DataTable.Title>
                <DataTable.Title numeric>TotalDeaths</DataTable.Title>
                <DataTable.Title numeric>TotalRecovered</DataTable.Title>
              </DataTable.Header>

              <DataTable.Row style={{justifyContent:'space-evenly'}}>
                {/* <DataTable.Cell numeric>{data?.Global.NewConfirmed}</DataTable.Cell>
                <DataTable.Cell numeric>{data?.Global.NewDeaths}</DataTable.Cell>
                <DataTable.Cell numeric>{data?.Global.NewRecovered}  </DataTable.Cell> */}
                <DataTable.Cell numeric>{data?.Global.TotalConfirmed}  </DataTable.Cell>
                <DataTable.Cell numeric>{data?.Global.TotalDeaths}  </DataTable.Cell>
                <DataTable.Cell numeric>{data?.Global.TotalRecovered}  </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </ScrollView>
        )}
      </View>
      <View>
        <View style={{justifyContent:'center', marginTop:'5%'}}>
        <Text style={{fontSize:25, fontWeight: 'bold', color:'#9400D3'}}>Country</Text>
        </View>
<View style={{marginTop:'5%',flexDirection:'row', justifyContent:'space-evenly', padding: 8}}>
  <Text style={{fontSize:20, color:'black'}}>Country</Text>
  <Text style={{fontSize:20, color:'black'}}>Cases</Text>
  <Text style={{fontSize:20, color:'black'}}>Deaths</Text>
  <Text style={{fontSize:20, color:'black'}}>Recovered</Text>
</View>
        <ScrollView>
          <DataTable style={{color:'black'}}>
            {/* <DataTable.Header>
              <DataTable.Title>Country</DataTable.Title>
              <DataTable.Title>NewConfirmed</DataTable.Title>
              <DataTable.Title >NewDeaths</DataTable.Title>
              <DataTable.Title numeric>NewRecovered</DataTable.Title>
              <DataTable.Title numeric>TotalConfirmed</DataTable.Title>
              <DataTable.Title numeric>TotalDeaths</DataTable.Title>
              <DataTable.Title numeric>TotalRecovered</DataTable.Title>
            </DataTable.Header> */}
            {data?.Countries.filter((val, index) => {
              if (Search == "") {
                return val;
              } else if (
                val.Country.toLowerCase().includes(Search.toLowerCase())
              ) {
                return val;
              }
            }).map((v, index) => {
              return <Text key={index}>
                <DataTable.Row><DataTable.Cell>{v.Country}</DataTable.Cell></DataTable.Row>
                {/* <DataTable.Row><DataTable.Cell>{v.NewConfirmed}</DataTable.Cell></DataTable.Row>
                <DataTable.Row><DataTable.Cell>{v.NewDeaths}</DataTable.Cell></DataTable.Row>
                <DataTable.Row><DataTable.Cell>{v.NewRecovered}</DataTable.Cell></DataTable.Row> */}
                <DataTable.Row ><DataTable.Cell >{v.TotalConfirmed}</DataTable.Cell></DataTable.Row>
                <DataTable.Row ><DataTable.Cell >{v.TotalDeaths}</DataTable.Cell></DataTable.Row>
                <DataTable.Row ><DataTable.Cell >{v.TotalRecovered}</DataTable.Cell></DataTable.Row>
              </Text>
            })
            }
          </DataTable>
        </ScrollView>
      </View>
    </View>
  );
}

export default NewTable;
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
