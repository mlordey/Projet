/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.isis.adventureISIServer;

/**
 *
 * @author asanto01
 */

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.bind.JAXBException;

@Path("generic")

public class WebService {

    Services services;

    public WebService() {
        services = new Services();
    }

    @GET
    @Path("world")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
public Response getWorld(@Context HttpServletRequest request) throws JAXBException, IOException{
        String username = request.getHeader("X-User");
        System.out.println("service;"+username);
        //services.getWorld(username);
        //return Response.ok().build();
        return Response.ok(services.getWorld(username)).build();
    }
}
