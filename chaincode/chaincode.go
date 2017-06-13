/*
Copyright IBM Corp 2016 All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

		 http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"strconv"
	//"strings"
	//"reflect"

	"github.com/hyperledger/fabric/core/chaincode/shim"
)

var userIndexStr = "_userindex"
//var campaignIndexStr= "_campaignindex"
//var transactionIndexStr= "_transactionindex"

type User struct {
	Name  string `json:"name"` //the fieldtags of user are needed to store in the ledger
    Email string `json:"email"`
	Phone int    `json:"phone"`
	Pan string `json:"pan"`
	Aadhar int `json:"aadhar"`
	Upi string `json:"upi"`
	UserType string `json:"usertype"`
    PassPin int `json:"passpin"`
   
   
}

type AllUsers struct{
	Userlist []User `json:"userlist"`
}

type SessionAunthentication struct{
Token  string `json:"token"`
Email string `json:"email"`
}
type Session struct{
	
StoreSession []SessionAunthentication `json:"session"`
}
type SimpleChaincode struct {
}

func main() {
	err := shim.Start(new(SimpleChaincode))
	if err != nil {
		fmt.Printf("Error starting Simple chaincode: %s", err)
	}
}


func (t *SimpleChaincode) Init(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	
	//_, args := stub.GetFunctionAndParameters()
	var Aval int
	var err error

	if len(args) != 1 {
		return nil, errors.New("Incorrect number of arguments. Expecting 1")
	}

	// Initialize the chaincode
	Aval, err = strconv.Atoi(args[0])
	if err != nil {
		return nil, errors.New("Expecting integer value for asset holding")
	}

	// Write the state to the ledger
	err = stub.PutState("abc", []byte(strconv.Itoa(Aval))) //making a test var "abc", I find it handy to read/write to it right away to test the network
	if err != nil {
		return nil, err
	}

	var empty []string
	jsonAsBytes, _ := json.Marshal(empty) //marshal an emtpy array of strings to clear the index
	err = stub.PutState(userIndexStr, jsonAsBytes)
	if err != nil {
		return nil, err
	}
	

	return nil, nil
}

// Invoke is ur entry point to invoke a chaincode function
func (t *SimpleChaincode) Invoke(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	fmt.Println("invoke is running " + function)

	// Handle different functions
	if function == "init" {
		return t.Init(stub, "init", args)
	} else if function == "write" {
		return t.write(stub, args)

	} else if function == "registerUser" {
		return t.registerUser(stub, args)

	} else if function == "Delete" {
		return t.Delete(stub, args)

	}else if function == "SaveSession" {
		return t.SaveSession(stub, args)

	}

	fmt.Println("invoke did not find func: " + function)

	return nil, errors.New("Received unknown function invocation: " + function)
}

// write - invoke function to write key/value pair
func (t *SimpleChaincode) write(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	var key, value string
	var err error
	fmt.Println("running write()")

	if len(args) != 2 {
		return nil, errors.New("Incorrect number of arguments. Expecting 2. name of the key and value to set")
	}

	key = args[0] //rename for funsies
	value = args[1]
	err = stub.PutState(key, []byte(value)) //write the variable into the chaincode state
	if err != nil {
		return nil, err
	}
	return nil, nil
}

// Query is our entry point for queries
func (t *SimpleChaincode) Query(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	fmt.Println("query is running " + function)

	// Handle different functions
	if function == "readuser" { //read a variable
		return t.readuser(stub, args)
	}else if function == "login" {
		return t.login(stub, args)

	}else if function == "auntheticatetoken" {
		return t.SetUserForSession(stub, args)

	}
	fmt.Println("query did not find func: " + function)

	return nil, errors.New("Received unknown function query: " + function)
}

// read - query function to read key/value pair

func (t *SimpleChaincode) readuser(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	var name, jsonResp string
	var err error
    
	if len(args) != 1 {
		return nil, errors.New("Incorrect number of arguments. Expecting name of the var to query")
	}

	name = args[0]
	valAsbytes, err := stub.GetState(name) //get the var from chaincode state
	if err != nil {
		jsonResp = "{\"Error\":\"Failed to get state for " + name + "\"}"
		return nil, errors.New(jsonResp)
	}

	return valAsbytes, nil //send it onward
}


func (t *SimpleChaincode) registerUser(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	var err error

	
	if len(args) != 8 {
		return nil, errors.New("Incorrect number of arguments. Expecting 8")
	}

	//input sanitation
	fmt.Println("- start registration")
	if len(args[0]) <= 0 {
		return nil, errors.New("1st argument must be a non-empty string")
	}
	if len(args[1]) <= 0 {
		return nil, errors.New("2nd argument must be a non-empty string")
	}
	if len(args[2]) <= 0 {
		return nil, errors.New("3rd argument must be a non-empty string")
	}
	if len(args[3]) <= 0 {
		return nil, errors.New("4th argument must be a non-empty string")
	}
	if len(args[4]) <= 0 {
		return nil, errors.New("5th argument must be a non-empty string")
	}
	if len(args[5]) <= 0 {
		return nil, errors.New("6th argument must be a non-empty string")
	}
	if len(args[6]) <= 0 {
		return nil, errors.New("7th argument must be a non-empty string")
	}
	user:=User{}
	user.Name = args[0]
	user.Email = args[1]
    user.Phone, err = strconv.Atoi(args[2])
	if err != nil {
		return nil, errors.New("Failed to get phone as cannot convert it to int")
	}
	user.Pan=args[3]
	user.Aadhar,err=strconv.Atoi(args[4])
	if err != nil {
		return nil, errors.New("Failed to get aadhar as cannot convert it to int")
	}
	user.UserType=args[5]
	user.Upi=args[6]
	user.PassPin, err = strconv.Atoi(args[7])
	if err != nil {
		return nil, errors.New("Failed to get passpin as cannot convert it to int")
	}
	
	fmt.Println("user",user)

UserAsBytes, err := stub.GetState("getusers")
	if err != nil {
		return nil, errors.New("Failed to get users")
	}
	var allusers AllUsers
	json.Unmarshal(UserAsBytes, &allusers)										//un stringify it aka JSON.parse()
	
	allusers.Userlist = append(allusers.Userlist,user);	
	fmt.Println("allusers",allusers.Userlist)					//append to allusers
	fmt.Println("! appended user to allusers")
	jsonAsBytes, _ := json.Marshal(allusers)
	fmt.Println("json",jsonAsBytes)
	err = stub.PutState("getusers", jsonAsBytes)								//rewrite allusers
	if err != nil {
		return nil, err
	}
	fmt.Println("- end user_register")
return nil, nil
}

func (t *SimpleChaincode) login(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	var err error

	if len(args) != 2 {
		return nil, errors.New("Incorrect number of arguments. Expecting 2")
	}

	//input sanitation
	fmt.Println("- login")
	if len(args[0]) <= 0 {
		return nil, errors.New("1st argument must be a non-empty string")
	}
	if len(args[1]) <= 0 {
		return nil, errors.New("2nd argument must be a non-empty string")
	}
	
	
	emailid := args[0]
	
	
	passpin, err := strconv.Atoi(args[1])
	if err != nil {
		return nil, errors.New("Failed to get passpin as cannot convert it to int")
	}
	



UserAsBytes, err := stub.GetState("getusers")
	if err != nil {
		return nil, errors.New("Failed to get users")
	}
	var allusers AllUsers
	json.Unmarshal(UserAsBytes, &allusers)										//un stringify it aka JSON.parse()
	



	for i:=0;i<len(allusers.Userlist);i++{
		
		
	if(allusers.Userlist[i].Email==emailid && allusers.Userlist[i].PassPin==passpin){
	
	
return []byte(allusers.Userlist[i].Email), nil
}
	}
return nil, nil
	}


func (t *SimpleChaincode) Delete(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	if len(args) != 1 {
		return nil, errors.New("Incorrect number of arguments. Expecting 1")
	}
	
	name := args[0]
	err := stub.DelState(name)													//remove the key from chaincode state
	if err != nil {
		return nil, errors.New("Failed to delete state")
	}

	//get the marble index
	userAsBytes, err := stub.GetState(userIndexStr)
	if err != nil {
		return nil, errors.New("Failed to get array index")
	}
	var userIndex []string
	json.Unmarshal(userAsBytes, &userIndex)								//un stringify it aka JSON.parse()
	
	//remove marble from index
	for i,val := range userIndex{
		fmt.Println(strconv.Itoa(i) + " - looking at " + val + " for " + name)
		if val == name{															//find the correct marble
		
			userIndex = append(userIndex[:i], userIndex[i+1:]...)			//remove it
			for x:= range userIndex{											//debug prints...
				fmt.Println(string(x) + " - " + userIndex[x])
			}
			break
		}
	}
	jsonAsBytes, _ := json.Marshal(userIndex)									//save new index
	err = stub.PutState(userIndexStr, jsonAsBytes)
	return nil, nil
}
func (t *SimpleChaincode) SaveSession(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	
	var err error
	fmt.Println("running write()")

	if len(args) != 2 {
		return nil, errors.New("Incorrect number of arguments. Expecting 2.")
	}
	if len(args[0]) <= 0 {
		return nil, errors.New("1st argument must be a non-empty string")
	}
	if len(args[1]) <= 0 {
		return nil, errors.New("2nd argument must be a non-empty string")
	}
	authsession:=SessionAunthentication{}
	authsession.Token = args[0]
	authsession.Email = args[1]
	UserAsBytes, err := stub.GetState("savesession")
	if err != nil {
		return nil, errors.New("Failed to get users")
	}
	var session Session
	json.Unmarshal(UserAsBytes, &session)										//un stringify it aka JSON.parse()
	
	session.StoreSession = append(session.StoreSession,authsession);	
	fmt.Println("allsessions",session.StoreSession)					//append to allusers
	fmt.Println("! appended user to allsessions")
	jsonAsBytes, _ := json.Marshal(session)
	fmt.Println("json",jsonAsBytes)
	err = stub.PutState("savesession", jsonAsBytes)								//rewrite allusers
	if err != nil {
		return nil, err
	}
	fmt.Println("- end save session")
return nil, nil
}
func (t *SimpleChaincode) SetUserForSession(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	var token string
	var err error
	fmt.Println("running write()")

	if len(args) != 1 {
		return nil, errors.New("Incorrect number of arguments. Expecting 2.")
	}
	token=args[0]
	    
	UserAsBytes, err := stub.GetState("savesession")
	if err != nil {
		return nil, errors.New("failed to get sessions")
	}
	var session Session
	 json.Unmarshal(UserAsBytes, &session)
	 for i:=0;i<len(session.StoreSession);i++{
	if(session.StoreSession[i].Token==token ){
	
	
return []byte(session.StoreSession[i].Email), nil
}
	}
return nil, nil
	}
	