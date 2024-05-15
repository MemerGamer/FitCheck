import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { CameraView, Camera, PermissionStatus } from 'expo-camera';
import { Button } from "react-native-elements";
import baseUrl from '../contexts/apiContext';

const ScannerScreen = ({ userId }: { userId: string }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status }: { status: PermissionStatus } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getCameraPermissions();
    }, []);

    const fetchBarcode = async (data: string) => {
        const response = await fetch(`${baseUrl}/memberships/scan/${data}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'UserId': `${userId}`
            }
        });
        if(response.ok){
            alert(`Membership with barcode ${data} has been scanned!`);
        }
        else{
            alert(`Membership with barcode ${data} not found, might be expired!`);
        }
        const json = await response.json();

        console.log(json);
    };
    const handleBarCodeScanned = ({ type, data }: { type: any, data: any }) => {
        setScanned(true);
        fetchBarcode(data);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    return (
        <View style={styles.container}>
            <CameraView
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr", "pdf417"],
                }}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <Button title={"Tap to Scan Again"} buttonStyle={{ backgroundColor: 'red', borderCurve: 'circular', width: 200, height: 200, alignSelf: 'center' }} onPress={() => setScanned(false)} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 40,
    },
    cameraContainer: {
        width: '80%',
        aspectRatio: 1,
        overflow: 'hidden',
        borderRadius: 10,
        marginBottom: 40,
    },
    camera: {
        flex: 1,
    },
    button: {
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ScannerScreen;