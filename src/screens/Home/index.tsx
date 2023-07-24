import { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { Card, CardProps } from '../../components/Card';
import { HeaderHome } from '../../components/HeaderHome';
import { useFocusEffect } from '@react-navigation/native';

import { styles } from './styles';
import { Button } from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Home() {
  const [data, setData] = useState<CardProps[]>([]);

  async function handleFetch() {
    const response = await AsyncStorage.getItem("@savepass:passwords");
    const data = response ? JSON.parse(response) : {};
    setData([data]);

  }

  useEffect(() => {
    handleFetch();
  }, [])
  
  async function handleRemove() {

  }

  return (
    <View style={styles.container}>
      <HeaderHome />

      <View style={styles.listHeader}>
        <Text style={styles.title}>
          Suas senhas
        </Text>

        <Text style={styles.listCount}>
          {`${data.length} ao total`}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) =>
          <Card
            data={item}
            onPress={() => handleRemove()}
          />
        }
      />

      <View style={styles.footer}>
        <Button
          title="Limpar lista"
        />
      </View>
    </View>
  );
}