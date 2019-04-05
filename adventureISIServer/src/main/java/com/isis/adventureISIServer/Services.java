/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.isis.adventureISIServer;

import generated.World;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.File;

/**
 *
 * @author asanto01
 */
public class Services {

  

    /*Désérialisation du XML*/
//    public World readWorldFromXml(String username){
//        JAXBContext jc;
//        InputStream input;
//        World world_return = null;
//        
//        try { 
//            input = new FileInputStream(username+"-XMLmonde.xml"); 
//        }catch(Exception e){
//            input = getClass().getClassLoader().getResourceAsStream("XMLmonde.xml");
//        }
//        World world = new World();
//        
//        try {
//            jc = JAXBContext.newInstance(World.class);
//            Unmarshaller u = jc.createUnmarshaller();
//            world = (World) u.unmarshal(input);
//            return world;
//        } catch (JAXBException ex) {
//            Logger.getLogger(Services.class.getName()).log(Level.SEVERE, null, ex);
//        }        
//        return null;
//    }
    public World readWorldFromXml(String username) {
        if (username == null) username = "unknown";
        World world_return = new World();
        System.out.println("Services "+username);
        try {   
            File world_xml = new File(username+"World.xml");
            if(!world_xml.exists() || username.equals("unknown")) {
                try {
                    System.out.println("-------------------------world" + username + "doesn't exist");
                    InputStream input_base = getClass().getClassLoader().getResourceAsStream("XMLmonde.xml");
                    JAXBContext cont = JAXBContext.newInstance(World.class);
                    Unmarshaller u = cont.createUnmarshaller();
                    World world_base = (World) u.unmarshal(input_base);
                    input_base.close();
                    return world_base;
         
                } catch (Exception e) {
                    e.printStackTrace();
                    return null;
                }              
//               
            } else {
                System.out.println("-------------------------world" + username + " exist");
                JAXBContext cont = JAXBContext.newInstance(World.class);
                Unmarshaller u = cont.createUnmarshaller();
                World world = (World) u.unmarshal(world_xml);
                world_return = world;
            }
          
        } catch (JAXBException ex) {
            Logger.getLogger(Services.class.getName()).log(Level.SEVERE, null, ex);
        }
      
        return world_return;
    }

    /*Sérialisation*/
    public void saveWorldToXml(World world, String username){
        try {
            OutputStream output = new FileOutputStream(username+"World.xml");
            JAXBContext cont = JAXBContext.newInstance(World.class);
            Marshaller m = cont.createMarshaller();
            m.marshal(world, output);
            output.close();
        } catch (FileNotFoundException ex) {
            ex.printStackTrace();
            Logger.getLogger(Services.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            ex.printStackTrace();
            Logger.getLogger(Services.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public World getWorld(String username)  throws FileNotFoundException, JAXBException, IOException {
        World world ;
        world = this.readWorldFromXml(username);
        if (world.getLastupdate() == 0) {
            world.setLastupdate(System.currentTimeMillis());
            this.saveWorldToXml(world, username);
        }
        return world;
    }
}
